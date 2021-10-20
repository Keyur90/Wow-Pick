locals {
  storage_account_name = "wow${var.application_short_code}${var.environment}sto${var.region}"
}

resource "azurerm_storage_account" "storage_account" {
  name                     = local.storage_account_name
  resource_group_name      = var.resource_group_name
  location                 = var.location
  account_replication_type = var.account_replication_type
  account_tier             = var.account_tier
  account_kind             = var.account_kind
  tags                     = var.default_tags
  allow_blob_public_access = true
  static_website {
    index_document = "index.html"
    error_404_document = "index.html"
  }
  lifecycle {
    ignore_changes = [tags]
  }
}

resource "azurerm_storage_account" "allure_report_storage_account" {
  count                    = substr(var.environment,0,3) == "dev" ? 1 : 0
  name                     = "wowpicke2ereport"
  resource_group_name      = var.resource_group_name
  location                 = var.location
  account_replication_type = var.account_replication_type
  account_tier             = var.account_tier
  account_kind             = var.account_kind
  tags                     = var.default_tags
  allow_blob_public_access = true
  static_website {
    index_document = "index.html"
    error_404_document = "index.html"
  }
  lifecycle {
    ignore_changes = [tags]
  }
}
