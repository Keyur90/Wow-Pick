variable "RESOURCE_GROUP_NAME" {
  default = "wlx-dev-wowpick-aae"
}

variable "APPLICATION_SHORT_CODE" {
  default = "wowpick"
}

variable "LOCATION" {
  default = "Australia East"
}
variable "REGION" {
  default = "aae"
}
variable "ENVIRONMENT" {
  default = "dev"
}
variable "RELEASE_PIPELINE_URL" {
  default = "https://wowonline.visualstudio.com/ECF/_build?definitionId=1982&_a=summary"
}
variable "GIT_REPO_URL" {
  default = "https://wowonline.visualstudio.com/ECF/_git/wowpick"
}
variable "ACCOUNT_REPLICATION_TYPE" {
  default = "RAGRS"
}
variable "ACCOUNT_TIER" {
  default = "Standard"
}
variable "ACCOUNT_KIND" {
  default = "StorageV2"
}



