terraform {
  backend "azurerm" {}

  # uncomment for local dev
  # backend "local" {}
}

provider "azurerm" {
  skip_provider_registration = true

  features {}
}



module "common" {
  source               = "./modules/common"
  environment          = var.ENVIRONMENT
  region               = var.REGION
  application_name     = var.APPLICATION_SHORT_CODE
  git_repo_url         = var.GIT_REPO_URL
}

module "storage" {
  source                   = "./modules/storage"
  default_tags             = module.common.common_tags
  environment              = var.ENVIRONMENT
  region                   = var.REGION
  location                 = module.common.location_name
  resource_group_name      = var.RESOURCE_GROUP_NAME
  application_short_code   = var.APPLICATION_SHORT_CODE
  account_replication_type = var.ACCOUNT_REPLICATION_TYPE
  account_tier             = var.ACCOUNT_TIER
  account_kind             = var.ACCOUNT_KIND
}

data "azurerm_resource_group" "resource_group" {
  name = var.RESOURCE_GROUP_NAME
}

# resource "azurerm_storage_account" "storage_account" {
#   name                     = local.storage_account_name
#   resource_group_name      = data.azurerm_resource_group.resource_group.name
#   location                 = var.LOCATION
#   account_replication_type = var.ACCOUNT_REPLICATION_TYPE
#   account_tier             = var.ACCOUNT_TIER
#   account_kind             = var.ACCOUNT_KIND
#   tags                     = module.common.common_tags
#   allow_blob_public_access = true
#   static_website {
#     index_document = "index.html"
#   }
#   lifecycle {
#     ignore_changes = [tags]
#   }
# }

