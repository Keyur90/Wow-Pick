import { useEffect, useState } from 'react';
import { ToteItem } from '@rf2/picking/data/api-contracts';
import ReactDOM from 'react-dom';
import { currentTripStateVar, updateIntitialStateForHasSupplyQuantityModified } from '@rf2/picking/data/api';

export const useTripNavigator = (toteItems: ToteItem[], startItemIndex?: number, viewAllMode?: boolean) => {
  const [currentIndex, setCurrentIndex] = useState(startItemIndex);
  const [viewAll, setViewAll] = useState(viewAllMode);
  const [canNavigatePrevious, setCanNavigatePrevious] = useState(false);
  const [isLastItem, setIsLastItem] = useState(true);

  useEffect(() => {
    if (!toteItems) return;

    // If currentIndex is null this mean that user just opened tote items page
    if (currentIndex === null) {
      const indexOfFirstUnSuppliedItem = toteItems.findIndex((x) => x.totalSuppliedQuantity < x.orderedQuantity);
      const allItemsAreSupplied = indexOfFirstUnSuppliedItem === -1;

      // If all items are supplied then move to last item else move to first non supplied item
      const initialIndex = allItemsAreSupplied ? toteItems.length - 1 : indexOfFirstUnSuppliedItem;

      ReactDOM.unstable_batchedUpdates(() => {
        setCanNavigatePrevious(initialIndex > 0);
        setIsLastItem(initialIndex === toteItems.length - 1);
        setCurrentIndex(initialIndex);
        updateIntitialStateForHasSupplyQuantityModified(toteItems[initialIndex]?.totalSuppliedQuantity);
      });

      return;
    }

    // Every time currentIndex, totes or view change then we need to recalculate both is last item
    // and can navigate previous values
    ReactDOM.unstable_batchedUpdates(() => {
      if (viewAll) {
        setCanNavigatePrevious(currentIndex > 0);
        setIsLastItem(currentIndex === toteItems.length - 1);
      } else {
        setCanNavigatePrevious(findIndexOfPreviousUnSuppliedItem(toteItems, currentIndex) !== -1);
        setIsLastItem(findIndexOfNextUnSuppliedItemIndex(toteItems, currentIndex) < 0);
      }
    });
  }, [toteItems, currentIndex, viewAll]);

  const navigatePrevious = () => {
    if (currentIndex === 0) return; // If already at first item then do noting
    if (viewAll) {
      updateIntitialStateForHasSupplyQuantityModified(toteItems[currentIndex - 1]?.totalSuppliedQuantity);
      setCurrentIndex(currentIndex - 1);
    } else {
      const previousUnSuppliedItemIndex = findIndexOfPreviousUnSuppliedItem(toteItems, currentIndex);
      updateIntitialStateForHasSupplyQuantityModified(toteItems[previousUnSuppliedItemIndex]?.totalSuppliedQuantity);
      setCurrentIndex(previousUnSuppliedItemIndex);
    }
  };

  const navigateNext = () => {
    if (currentIndex === toteItems.length - 1) return; // If already at last item then do noting
    if (viewAll) {
      updateIntitialStateForHasSupplyQuantityModified(toteItems[currentIndex + 1]?.totalSuppliedQuantity);
      setCurrentIndex(currentIndex + 1);
    } else {
      const nextUnSuppliedItemIndex = findIndexOfNextUnSuppliedItemIndex(toteItems, currentIndex);
      updateIntitialStateForHasSupplyQuantityModified(toteItems[nextUnSuppliedItemIndex]?.totalSuppliedQuantity);
      setCurrentIndex(nextUnSuppliedItemIndex);
    }
  };

  const toggleView = () => {
    const toggledView = !viewAll;
    setViewAll(toggledView);
    const tripState = currentTripStateVar();
    tripState.viewAll = toggledView;
    currentTripStateVar(tripState);
  };

  return { navigateNext, navigatePrevious, toggleView, canNavigatePrevious, viewAll, currentIndex, isLastItem };
};

// item considered supplied if supplied quantity is greater than or equals to orderedQuantity
// and considered up-supplied if supplied quantity less than ordered quantity
const findIndexOfNextUnSuppliedItemIndex = (toteItems, currentIndex) => {
  for (let i = currentIndex + 1; i < toteItems.length; i++) {
    if (toteItems[i].totalSuppliedQuantity < toteItems[i].orderedQuantity) return i;
  }
  return -1; // Can't find any up-supplied item
};

const findIndexOfPreviousUnSuppliedItem = (toteItems, currentIndex) => {
  for (let i = currentIndex - 1; i >= 0; i--) {
    if (toteItems[i].totalSuppliedQuantity < toteItems[i].orderedQuantity) return i;
  }
  return -1; // Can't find any up-supplied item
};
