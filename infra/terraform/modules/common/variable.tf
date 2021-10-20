variable "environment" {}
variable "application_name" {}
variable "git_repo_url" {}
variable "region" {}
variable "resource_locations" {
  type = map
  default = {
    aae = "australiaeast"
    aas = "australiasoutheast"
  }
}