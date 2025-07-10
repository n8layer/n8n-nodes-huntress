import type { INodeProperties } from 'n8n-workflow';

export const billingReportOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'billingReport',
				],
			},
		},
		options: [
			{
				name: 'Get Billing Report',
				value: 'getBillingReport',
				action: 'Get billing report',
				routing: {
					request: {
						method: 'GET',
						url: '=/billing_reports/{{$parameter["billingReportId"]}}',
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									extractedBillingReport: '={{ $parameter.extractBillingReport ? $response.body.billingReport : [$response.body] }}',
								},
							},
							{
								type: 'rootProperty',
								properties: {
									property: 'extractedBillingReport',
								}
							}
						]
					}
				},
			},
			{
				name: 'Get Billing Reports',
				value: 'getMany',
				action: 'Get billing reports',
				routing: {
					request: {
						method: 'GET',
						url: '/billing_reports',
						qs: {
							limit: '={{$parameter.limit}}',
							page: '={{$parameter.page}}',
							created_at_min: '={{$parameter.created_at_min || undefined}}',
							created_at_max: '={{$parameter.created_at_max || undefined}}',
							updated_at_min: '={{$parameter.updated_at_min || undefined}}',
							updated_at_max: '={{$parameter.updated_at_max || undefined}}',
							status: '={{$parameter.status}}',
						},
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									extractedBillingReports: '={{ $parameter.extractBillingReports ? $response.body.billingReports : [$response.body] }}',
								},
							},
							{
								type: 'rootProperty',
								properties: {
									property: 'extractedBillingReports',
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

export const billingReportFields: INodeProperties[] = [
	{
		displayName: 'Billing Report ID',
		name: 'billingReportId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['billingReport'],
				operation: ['getBillingReport'],
			},
		},
		default: '',
		description: 'The ID of the billing report to get',
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
				resource: ['billingReport'],
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
				resource: ['billingReport'],
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
				resource: ['billingReport'],
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
				resource: ['billingReport'],
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
				resource: ['billingReport'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'An ISO8601 formatted date string representing the upper bound of the search range for the updated_at date. If provided with updated_at_min, updated_at_max must be greater than updated_at_min or a 400 error will occur.',
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['billingReport'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				name: 'Draft',
				value: 'draft',
			},
			{
				name: 'Failed',
				value: 'failed',
			},
			{
				name: 'Full Refund',
				value: 'full_refund',
			},
			{
				name: 'Open',
				value: 'open',
			},
			{
				name: 'Paid',
				value: 'paid',
			},
			{
				name: 'Partial Refund',
				value: 'partial_refund',
			},
			{
				name: 'Voided',
				value: 'voided',
			},
		],
		default: 'open',
		description: 'Filter by status. One of open, paid, failed, partial_refund, full_refund, draft, voided.',
	},
	{
		displayName: 'Extract Billing Reports',
		name: 'extractBillingReports',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['billingReport'],
				operation: ['getMany'],
			},
		},
		default: true,
		description: 'Whether to extract the billing reports from the response',
	},
	{
		displayName: 'Extract Billing Report',
		name: 'extractBillingReport',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['billingReport'],
				operation: ['getBillingReport'],
			},
		},
		default: true,
		description: 'Whether to extract the billing report from the response',
	},
];