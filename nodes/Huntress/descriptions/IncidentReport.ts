import type { INodeProperties } from 'n8n-workflow';

export const incidentReportOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'incidentReport',
				],
			},
		},
		options: [
			{
				name: 'Create Incident Report Resolution',
				value: 'createIncidentReportResolution',
				action: 'Create incident report resolution',
				description: 'Create a resolution for an incident report. All remediations belonging to the Incident Report must be approved first.',
				routing: {
					request: {
						method: 'POST',
						url: '=/incident_reports/{{$parameter["incidentReportId"]}}/resolutions',
					},
				},
			},
			{
				name: 'Get Incident Report',
				value: 'getIncidentReport',
				action: 'Get incident report',
				routing: {
					request: {
						method: 'GET',
						url: '=/incident_reports/{{$parameter["incidentReportId"]}}',
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									extractedIncidentReport: '={{ $parameter.extractIncidentReport ? $response.body.incidentReport : [$response.body] }}',
								},
							},
							{
								type: 'rootProperty',
								properties: {
									property: 'extractedIncidentReport',
								}
							}
						]
					}
				},
			},
			{
				name: 'List Incident Reports',
				value: 'getMany',
				action: 'List incident reports',
				routing: {
					request: {
						method: 'GET',
						url: '/incident_reports',
						qs: {
							limit: '={{$parameter.limit}}',
							page: '={{$parameter.page}}',
							updated_at_min: '={{$parameter.updated_at_min || undefined}}',
							updated_at_max: '={{$parameter.updated_at_max || undefined}}',
							indicator_type: '={{$parameter.indicatorType || undefined}}',
							status: '={{$parameter.status || undefined}}',
							severity: '={{$parameter.severity || undefined}}',
							platform: '={{$parameter.platform || undefined}}',
							organization_id: '={{$parameter.organizationId || undefined}}',
							agent_id: '={{$parameter.agentId || undefined}}',
						},
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									extractedIncidentReports: '={{ $parameter.extractIncidentReports ? $response.body.incident_reports : [$response.body] }}',
								},
							},
							{
								type: 'rootProperty',
								properties: {
									property: 'extractedIncidentReports',
								}
							}
						]
					}
				},
			},
		],
		default: 'getMany',
	},
];

export const incidentReportFields: INodeProperties[] = [
	{
		displayName: 'Incident Report ID',
		name: 'incidentReportId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['incidentReport'],
				operation: ['getIncidentReport', 'createIncidentReportResolution'],
			},
		},
		default: '',
		description: 'The ID of the incident report to get',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1
		},
		displayOptions: {
			show: {
				resource: ['incidentReport'],
				operation: ['getMany'],
			},
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['incidentReport'],
				operation: ['getMany'],
			},
		},
		default: 1,
		description: 'The window location for the current resource. In conjunction with the limit field, shows results beginning with page * limit up to (page + 1) * limit. Must be an integer greater than 0 or a 400 error will occur.',
	},
	{
		displayName: 'Updated At Min',
		name: 'updated_at_min',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['incidentReport'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'An ISO8601 formatted date string representing the lower bound of the search range for the updated_at date. Must provide a date greater than January 1st, 2010 or a 400 error will occur.',
	},
	{
		displayName: 'Updated At Max',
		name: 'updated_at_max',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['incidentReport'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'An ISO8601 formatted date string representing the upper bound of the search range for the updated_at date. If provided with updated_at_min, updated_at_max must be greater than updated_at_min or a 400 error will occur.',
	},
	{
		displayName: 'Indicator Type',
		name: 'indicatorType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['incidentReport'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				name: 'All Indicator Types',
				value: '',
			},
			{
				name: 'Antivirus Detections',
				value: 'antivirus_detections',
			},
			{
				name: 'Favicon Detections',
				value: 'favicon_detections',
			},
			{
				name: 'Footholds',
				value: 'footholds',
			},
			{
				name: 'Managed Identity',
				value: 'managed_identity',
			},
			{
				name: 'MDE Detections',
				value: 'mde_detections',
			},
			{
				name: 'Process Detections',
				value: 'process_detections',
			},
			{
				name: 'Ransomware Canaries',
				value: 'ransomware_canaries',
			},
			{
				name: 'SIEM Detections',
				value: 'siem_detections',
			},
		],
		default: '',
		description: 'Filter by indicator type. One of footholds, monitored_files, ransomware_canaries, antivirus_detections, process_detections, managed_identity, mde_detections, siem_detections, favicon_detections.',
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['incidentReport'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				name: 'All Statuses',
				value: '',
			},
			{
				name: 'Auto Remediating',
				value: 'auto_remediating',
			},
			{
				name: 'Closed',
				value: 'closed',
			},
			{
				name: 'Deleting',
				value: 'deleting',
			},
			{
				name: 'Dismissed',
				value: 'dismissed',
			},
			{
				name: 'Sent',
				value: 'sent',
			},
		],
		default: '',
		description: 'Filter by status. One of sent, closed, dismissed, auto_remediating, deleting.',
	},
	{
		displayName: 'Severity',
		name: 'severity',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['incidentReport'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				name: 'All Severities',
				value: '',
			},
			{
				name: 'Critical',
				value: 'critical',
			},
			{
				name: 'High',
				value: 'high',
			},
			{
				name: 'Low',
				value: 'low',
			},
		],
		default: '',
		description: 'Filter by severity. One of low, high, critical.',
	},
	{
		displayName: 'Platform',
		name: 'platform',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['incidentReport'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				name: 'All Platforms',
				value: '',
			},
			{
				name: 'Darwin',
				value: 'darwin',
			},
			{
				name: 'Google',
				value: 'google',
			},
			{
				name: 'Linux',
				value: 'linux',
			},
			{
				name: 'Microsoft 365',
				value: 'microsoft_365',
			},
			{
				name: 'Other',
				value: 'other',
			},
			{
				name: 'Windows',
				value: 'windows',
			},
		],
		default: '',
		description: 'Filter by platform. One of windows, darwin, microsoft_365, google, linux, other.',
	},
	{
		displayName: 'Organization ID',
		name: 'organizationId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['incidentReport'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'Filter by organization ID within Huntress account',
	},
	{
		displayName: 'Agent ID',
		name: 'agentId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['incidentReport'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'Filter by organization ID within Huntress account',
	},
	{
		displayName: 'Extract Incident Reports',
		name: 'extractIncidentReports',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['incidentReport'],
				operation: ['getMany'],
			},
		},
		default: true,
		description: 'Whether to extract the incident reports from the response',
	},
	{
		displayName: 'Extract Incident Report',
		name: 'extractIncidentReport',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['incidentReport'],
				operation: ['getIncidentReport'],
			},
		},
		default: true,
		description: 'Whether to extract the incident report from the response',
	},
];
