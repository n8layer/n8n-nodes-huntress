import type { INodeProperties } from 'n8n-workflow';

export const organizationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'organization',
				],
			},
		},
		options: [
			{
				name: 'Get Organizations',
				value: 'getMany',
				action: 'Get organizations',
				routing: {
					request: {
						method: 'GET',
						url: '/organizations',
						qs: {
							limit: '={{$parameter.limit}}',
							page: '={{$parameter.page}}',
							created_at_min: '={{$parameter.created_at_min || undefined}}',
							created_at_max: '={{$parameter.created_at_max || undefined}}',
							updated_at_min: '={{$parameter.updated_at_min || undefined}}',
							updated_at_max: '={{$parameter.updated_at_max || undefined}}',
						},
					},
				},
			},
		],
		default: 'getMany',
	},
];

export const organizationFields: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1
		},
		displayOptions: {
			show: {
				resource: ['organization'],
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
				resource: ['organization'],
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
				resource: ['organization'],
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
				resource: ['organization'],
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
				resource: ['organization'],
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
				resource: ['organization'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'An ISO8601 formatted date string representing the upper bound of the search range for the updated_at date. If provided with updated_at_min, updated_at_max must be greater than updated_at_min or a 400 error will occur.',
	}
];