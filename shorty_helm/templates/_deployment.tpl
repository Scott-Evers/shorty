{{/* Creates a K8s deployment.  Should be used twice in this chart, for the API 
     as well as the UI */}}
{{- define "shorty.deployment" }}
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .deployment.name }}
  namespace: {{ .Values.namespace }}
  labels: 
    tier: {{ .deployment.name }}
    {{- include "shorty_helm.labels" . | nindent 4 }}
spec:
  selector:
    matchLabels:
      tier: {{ .deployment.name }}
      {{- include "shorty_helm.labels" . | nindent 6 }}
  replicas: 1
  template:
    metadata:
      labels:
        tier: {{ .deployment.name }}
        {{- include "shorty_helm.labels" . | nindent 8 }}
    spec:
      containers:
      - name: {{ .deployment.name }}
        image: {{ .deployment.image }}
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: {{ .deployment.containerPort }}

{{- end }}