{{/* Creates a K8s service.  Should be used twice in this chart, for the API as 
     well as the UI */}}
{{- define "shorty.service" }}
---
apiVersion: v1
kind: Service
metadata:
  name: {{ .service.name }}
  namespace: {{ .Values.namespace }}
  labels:
    tier: {{ .service.name }}
    {{- include "shorty_helm.labels" . | nindent 4 }}
spec:
  type: ClusterIP
  ports:
    - port: {{ .service.port }}
      targetPort: {{ .service.targetPort }}
      protocol: TCP
      name: http
  selector:
    tier: {{ .service.name }}
    {{- include "shorty_helm.selectorLabels" . | nindent 4 }}

{{- end }}