import type { INodeProperties } from 'n8n-workflow';

export const reportOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'report',
				],
			},
		},
		options: [
			{
				name: 'Get Report',
				value: 'getReport',
				action: 'Get report',
				routing: {
					request: {
						method: 'GET',
						url: '=/reports/{{$parameter["reportId"]}}',
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									extractedReport: '={{ $parameter.extractReport ? $response.body.report : [$response.body] }}',
								},
							},
							{
								type: 'rootProperty',
								properties: {
									property: 'extractedReport',
								}
							}
						]
					}
				},
			},
			{
				name: 'Get Reports',
				value: 'getMany',
				action: 'Get reports',
				routing: {
					request: {
						method: 'GET',
						url: '/reports',
						qs: {
							limit: '={{$parameter.limit}}',
							page: '={{$parameter.page}}',
							created_at_min: '={{$parameter.created_at_min || undefined}}',
							created_at_max: '={{$parameter.created_at_max || undefined}}',
							updated_at_min: '={{$parameter.updated_at_min || undefined}}',
							updated_at_max: '={{$parameter.updated_at_max || undefined}}',
							period_min: '={{$parameter.period_min || undefined}}',
							period_max: '={{$parameter.period_max || undefined}}',
							organization_id: '={{$parameter.organization_id}}',
							type: '={{$parameter.type}}',
						},
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									extractedReports: '={{ $parameter.extractReports ? $response.body.reports : [$response.body] }}',
								},
							},
							{
								type: 'rootProperty',
								properties: {
									property: 'extractedReports',
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

export const reportFields: INodeProperties[] = [
	{
		displayName: 'Report ID',
		name: 'reportId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['getReport'],
			},
		},
		default: '',
		description: 'The ID of the report to get',
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
				resource: ['report'],
				operation: ['getMany'],
			},
		},
		default: 10,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['billingReport'],
				operation: ['getMany'],
			},
		},
		default: 1,
		description: 'The window location for the current resource. In conjunction with the limit field, shows results beginning with page * limit up to (page + 1) * limit. Must be an integer greater than 0 or a 400 error will occur.',
	},
	{
		displayName: 'Created At Min',
		name: 'created_at_min',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'An ISO8601 formatted date string representing the lower bound of the search range for the created_at date. Must provide a date greater than January 1st, 2010 or a 400 error will occur.',
	},
	{
		displayName: 'Created At Max',
		name: 'created_at_max',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'An ISO8601 formatted date string representing the upper bound of the search range for the created_at date. If provided with created_at_min, created_at_max must be greater than created_at_min or a 400 error will occur.',
	},
	{
		displayName: 'Updated At Min',
		name: 'updated_at_min',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['report'],
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
				resource: ['report'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'An ISO8601 formatted date string representing the upper bound of the search range for the updated_at date. If provided with updated_at_min, updated_at_max must be greater than updated_at_min or a 400 error will occur.',
	},
	{
		displayName: 'Period Min',
		name: 'period_min',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'An ISO860 formatted date string representing the lower bound of a filter window on the period field. Returns summary reports where the upper bound of the period is greater than period_min. If provided in conjunction with period_max, if period_max is less than period_min, a 400 error is returned.'
	},
	{
		displayName: 'Period Max',
		name: 'period_max',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'An ISO860 formatted date string representing the upper bound of a filter window on the period field. Returns summary reports where the lower bound of the period is less than period_max.'
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				name: 'Monthly Summary',
				value: 'monthly_summary',
			},
			{
				name: 'Quarterly Summary',
				value: 'quarterly_summary',
			},
			{
				name: 'Yearly Summary',
				value: 'yearly_summary',
			},
		],
		default: 'monthly_summary',
		description: 'Filter by report type. One of monthly_summary, quarterly_summary, yearly_summary.',
	},
	{
		displayName: 'Organization ID',
		name: 'organizationId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'Filter by organization ID within Huntress account',
	},
	{
		displayName: 'Extract Reports',
		name: 'extractReports',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['getMany'],
			},
		},
		default: true,
		description: 'Whether to extract the billing reports from the response',
	},
	{
		displayName: 'Extract Report',
		name: 'extractReport',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['getReport'],
			},
		},
		default: true,
		description: 'Whether to extract the billing report from the response',
	},
];