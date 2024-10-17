variable "region_code" {
  description = "Value of the app region"
  type        = string
  default     = "eu-central-1"
}

variable "cluster_name" {
  description = "Value of the cluster name of the cluster"
  type        = string
  default     = "cloud-design-cluster"
}

variable "cluster_role_name" {
  description = "Value of the cluster role name of the cluster"
  type        = string
  default     = "eks-cluster-role"
}

variable "nodegroup_role_name" {
  description = "Value of the nodegroup role name of the cluster"
  type        = string
  default     = "eks-nodegroup-role"
}

variable "nodegroup_name" {
  description = "Value of the nodegroup name of the cluster"
  type        = string
  default     = "cloud-design-nodegroup"
}

variable "ebs_csi_driver_name" {
  description = "Value of the EBS name of the cluster"
  type        = string
  default     = "cloud-design-ebs-csi-driver"
}

variable "ebs_csi_driver_encryption_name" {
  description = "Value of the EBS encryption name of the cluster"
  type        = string
  default     = "cloud-design-ebs-csi-driver-encryption"
}
