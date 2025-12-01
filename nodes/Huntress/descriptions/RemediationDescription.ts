import type { INodeProperties } from 'n8n-workflow';

export const remediationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'remediation',
				],
			},
		},
		options: [
			{
				name: 'Bulk Approve Remediations',
				value: 'bulkApproveRemediations',
				action: 'Bulk approve remediations',
				routing: {
					request: {
						method: 'POST',
						url: '=/incident_reports/{{$parameter["incidentReportId"]}}/remediations/bulk_approve',
					},
				},
			},
			{
				name: 'Bulk Deny Remediations',
				value: 'bulkDenyRemediations',
				action: 'Bulk deny remediations',
				routing: {
					request: {
						method: 'POST',
						url: '=/incident_reports/{{$parameter["incidentReportId"]}}/remediations/bulk_deny',
					},
				},
			},
			{
				name: 'Get Remediation',
				value: 'getRemediation',
				action: 'Get remediation',
				routing: {
					request: {
						method: 'GET',
						url: '=/incident_reports/{{$parameter["incidentReportId"]}}/remediations/{{$parameter["remediationId"]}}',
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									extractedRemediation: '={{ $parameter.extractRemediation ? $response.body.remediation : [$response.body] }}',
								},
							},
							{
								type: 'rootProperty',
								properties: {
									property: 'extractedRemediation',
								}
							}
						]
					}
				},
			},
			{
				name: 'List Remediations',
				value: 'listRemediations',
				action: 'List remediations',
				routing: {
					request: {
						method: 'GET',
						url: '=/incident_reports/{{$parameter["incidentReportId"]}}/remediations',
					qs: {
						limit: '={{$parameter.limit}}',
						types: '={{$parameter.types?.join(",") || undefined}}',
						statuses: '={{$parameter.statuses?.join(",") || undefined}}',
						page_token: '={{$parameter.page_token}}',
					},
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									extractedRemediations: '={{ $parameter.extractRemediations ? $response.body.remediations : [$response.body] }}',
								},
							},
							{
								type: 'rootProperty',
								properties: {
									property: 'extractedRemediations',
								}
							}
						]
					}
				},
			},
		],
		default: 'getRemediation',
	},
];

export const remediationFields: INodeProperties[] = [
	{
		displayName: 'Incident Report ID',
		name: 'incidentReportId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['remediation'],
				operation: ['listRemediations', 'getRemediation', 'bulkApproveRemediations', 'bulkDenyRemediations'],
			},
		},
		default: '',
		description: 'The ID of the incident report to get',
	},
	{
		displayName: 'Remediation ID',
		name: 'remediationId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['remediation'],
				operation: ['getRemediation'],
			},
		},
		default: '',
		description: 'The ID of the remediation to get',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['remediation'],
				operation: ['listRemediations'],
			},
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Types',
		name: 'types',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['remediation'],
				operation: ['listRemediations'],
			},
		},
		options: [
			{
				name: 'Assisted',
				value: 'assisted',
			},
			{
				name: 'Manual',
				value: 'manual',
			},
			{
				name: 'Containment',
				value: 'containment',
			},
		],
		default: [],
		description: 'Filter by type of remediation. Select multiple values to filter.',
	},
	{
		displayName: 'Statuses',
		name: 'statuses',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['remediation'],
				operation: ['listRemediations'],
			},
		},
		options: [
			{
				name: 'Approved',
				value: 'approved',
			},
			{
				name: 'Cancelled',
				value: 'cancelled',
			},
			{
				name: 'Completed',
				value: 'completed',
			},
			{
				name: 'Failed',
				value: 'failed',
			},
			{
				name: 'Unapproved',
				value: 'unapproved',
			},
		],
		default: [],
		description: 'Filter by status of remediation. Select multiple values to filter.',
	},
	{
		displayName: 'Page Token',
		name: 'page_token',
		type: 'string',
		typeOptions: {
			password: true,
		},
		displayOptions: {
			show: {
				resource: ['remediation'],
				operation: ['listRemediations'],
			},
		},
		default: '',
		description: 'Token used to request the next page in paginated results. Defaults to null.',
	},
	{
		displayName: 'Extract Remediations',
		name: 'extractRemediations',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['remediation'],
				operation: ['listRemediations'],
			},
		},
		description: 'Whether to extract the remediations from the response',
	},
	{
		displayName: 'Extract Remediation',
		name: 'extractRemediation',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['remediation'],
				operation: ['getRemediation'],
			},
		},
		description: 'Whether to extract the remediation from the response',
	},
];
