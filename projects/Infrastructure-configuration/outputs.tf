output "cluster_endpoint" {
  description = "Endpoint for EKS control plane"
  value       = aws_eks_cluster.eks_cluster.endpoint
}

output "cluster_security_group_id" {
  description = "Security group ID attached to the EKS cluster"
  value       = aws_eks_cluster.eks_cluster.vpc_config[0].cluster_security_group_id
}

output "cluster_arn" {
  description = "EKS cluster ARN"
  value       = aws_eks_cluster.eks_cluster.arn
}


output "cluster_name" {
  description = "cluster output name"
  value       = aws_eks_cluster.eks_cluster.name
}

output "region" {
  description = "AWS region"
  value       = var.region_code
}
