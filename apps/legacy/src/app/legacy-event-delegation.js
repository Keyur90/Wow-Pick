// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import React, { useEffect, useState } from 'react';
// import { useRouteMatch } from 'react-router-dom';
// import camelcaseKeys from 'camelcase-keys';
// import { globalState } from './legacy-bootstrap';

// const featureFlags = {
//   nextTrolleyTrip: true,
//   nextExpressTrolleyTrip: false,
//   sequenceWhileInTrip: false,
//   substitutionWhileInTrip: true,
// };

// const LegacyEventDelegation = ({ history }) => {
//   const [showNewApp, setShowNewApp] = useState(false);
//   const [callBackUrl, setCallBackUrl] = useState(null);

//   let sendToLegacyUrlMatch = useRouteMatch('/legacy/:eventToSendToLegacy');
//   let homeUrlMatch = useRouteMatch({
//     path: '/',
//     strict: true,
//     sensitive: true,
//   });
//   const location = useLocation();

//   useEffect(() => {
//     if (sendToLegacyUrlMatch === null) {
//       if (homeUrlMatch === null) {
//         setShowNewApp(true);
//       } else {
//         setShowNewApp(false);
//       }
//     } else {
//       const event = sendToLegacyUrlMatch.params.eventToSendToLegacy;
//       const args = location.state;

//       if (args.callBackUrl) {
//         setCallBackUrl(args.callBackUrl);
//       }

//       document
//         .getElementById('legacyRF')
//         .contentWindow.postMessage(
//           { event: 'eventFromNewApp', name: event, args },
//           '*'
//         );
//     }
//   }, [location, homeUrlMatch, sendToLegacyUrlMatch]);

//   const activateLegacyApp = (eventName, args) => {
//     document
//       .getElementById('legacyRF')
//       .contentWindow.postMessage(
//         { event: 'eventFromNewApp', name: eventName, args },
//         '*'
//       );
//   };

//   useEffect(() => {
//     window.addEventListener('message', function (e) {
//       if (e.data.event !== 'eventFromLegacyApp') return;

//       //      debugger;
//       let handledByNewApp;
//       let args = e.data.args;

//       switch (e.data.name) {
//         case 'loginSuccessful': {
//           //handledByNewApp = featureFlags.nextTrolleyTrip;
//           // ToDo: route to right micro front end page in the new app
//           let userContextFromLegacy = camelcaseKeys(e.data.args, {
//             deep: true,
//           });
//           globalState.userState = userContextFromLegacy.userContext;
//           globalState.userState.userName = userContextFromLegacy.userName;
//           globalState.userState.storeNo = userContextFromLegacy.storeNo;
//           break;
//         }
//         case 'trolleyPickTrip':
//           handledByNewApp = featureFlags.nextTrolleyTrip;
//           // ToDo: route to right micro front end page in the new app
//           if (handledByNewApp) {
//             history.push('/mfpicking/tripsummary', e.data.args);
//           }
//           break;
//         case 'trolleyPickExpressTrip':
//           handledByNewApp = featureFlags.nextExpressTrolleyTrip;
//           // ToDo: route to right micro front end page in the new app
//           break;
//         case 'trolleySequence':
//           handledByNewApp = featureFlags.sequenceWhileInTrip;
//           // ToDo: route to right micro front end page in the new app
//           break;
//         case 'trolleySubExit':
//           handledByNewApp = featureFlags.substitutionWhileInTrip;
//           // ToDo: route to right micro front end page in the new app
//           if (callBackUrl !== null) {
//             history.push(`${callBackUrl}/subCancel`);
//           }
//           break;
//         case 'trolleyPickItemReturnToCurrLine':
//           handledByNewApp = featureFlags.substitutionWhileInTrip;
//           if (callBackUrl !== null) {
//             history.push(`${callBackUrl}/subCancel`);
//           }
//           // ToDo: route to right micro front end page in the new app
//           break;
//         case 'trolleyDisplayItemNext':
//           handledByNewApp = featureFlags.substitutionWhileInTrip;
//           // call new API to update orderAggregate
//           if (callBackUrl !== null) {
//             history.push(`${callBackUrl}/subDoneMoveNext`);
//           }
//           // ToDo: route to right micro front end page in the new app
//           break;
//         default:
//           handledByNewApp = false;
//       }

//       document.getElementById('legacyRF').contentWindow.postMessage(
//         {
//           event: 'handlingByNewAppStatus',
//           handled: handledByNewApp,
//           id: e.data.id,
//           args: e.data.args,
//         },
//         '*'
//       );

//       // for just POC purposes show the new app
//       setShowNewApp(handledByNewApp);
//     });
//   }, [callBackUrl]);

//   useEffect(() => {
//     document.getElementById('legacyRF').style.display = showNewApp
//       ? 'none'
//       : 'block';
//   }, [showNewApp]);

//   return null;
// };

// export default LegacyEventDelegation;
