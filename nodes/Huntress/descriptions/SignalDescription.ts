import type { INodeProperties } from 'n8n-workflow';

export const signalOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'signal',
				],
			},
		},
		options: [
			{
				name: 'Get Signal',
				value: 'getSignal',
				action: 'Get signal',
				routing: {
					request: {
						method: 'GET',
						url: '=/signals/{{$parameter["signalId"]}}',
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									extractedSignal: '={{ $parameter.extractSignal ? $response.body.signal : [$response.body] }}',
								},
							},
							{
								type: 'rootProperty',
								properties: {
									property: 'extractedSignal',
								}
							}
						]
					}
				},
			},
			{
				name: 'Get Signals',
				value: 'getMany',
				action: 'Get signals',
				routing: {
					request: {
						method: 'GET',
						url: '/signals',
						qs: {
							limit: '={{$parameter.limit}}',
							page: '={{$parameter.page}}',
							created_at_min: '={{$parameter.created_at_min || undefined}}',
							created_at_max: '={{$parameter.created_at_max || undefined}}',
							updated_at_min: '={{$parameter.updated_at_min || undefined}}',
							updated_at_max: '={{$parameter.updated_at_max || undefined}}',
							investigated_at_min: '={{$parameter.investigated_at_min || undefined}}',
							investigated_at_max: '={{$parameter.investigated_at_max || undefined}}',
							organization_id: '={{$parameter.organization_id}}',
							types: '={{$parameter.types}}',
							statuses: '={{$parameter.statuses}}',
						},
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									extractedSignals: '={{ $parameter.extractSignals ? $response.body.signals : [$response.body] }}',
								},
							},
							{
								type: 'rootProperty',
								properties: {
									property: 'extractedSignals',
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

export const signalFields: INodeProperties[] = [
	{
		displayName: 'Signal ID',
		name: 'signalId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['signal'],
				operation: ['getSignal'],
			},
		},
		default: '',
		description: 'The ID of the signal to get',
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
				resource: ['signal'],
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
				resource: ['signal'],
				operation: ['getMany'],
			},
		},
		default: 1,
		description: 'The window location for the current resource. In conjunction with the limit field, shows results beginning with page * limit up to (page + 1) * limit. Must be an integer greater than 0 or a 400 error will occur.',
	},
	{
		displayName: 'Created At Min',
		name: 'created_at_min',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['signal'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'An ISO8601 formatted date string representing the lower bound of the search range for the created_at date. Must provide a date greater than January 1st, 2010 or a 400 error will occur.',
	},
	{
		displayName: 'Created At Max',
		name: 'created_at_max',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['signal'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'An ISO8601 formatted date string representing the upper bound of the search range for the created_at date. If provided with created_at_min, created_at_max must be greater than created_at_min or a 400 error will occur.',
	},
	{
		displayName: 'Updated At Min',
		name: 'updated_at_min',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['signal'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'An ISO8601 formatted date string representing the lower bound of the search range for the updated_at date. Must provide a date greater than January 1st, 2010 or a 400 error will occur.',
	},
	{
		displayName: 'Updated At Max',
		name: 'updated_at_max',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['signal'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'An ISO8601 formatted date string representing the upper bound of the search range for the updated_at date. If provided with updated_at_min, updated_at_max must be greater than updated_at_min or a 400 error will occur.',
	},
	{
		displayName: 'Investigated At Min',
		name: 'investigated_at_min',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['signal'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'An ISO860 formatted date string representing the lower bound of a filter window on the investigated_at field. Returns signals where the upper bound of the investigated_at is greater than investigated_at_min. If provided in conjunction with investigated_at_max, if investigated_at_max is less than investigated_at_min, a 400 error is returned.'
	},
	{
		displayName: 'Investigated At Max',
		name: 'investigated_at_max',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['signal'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'An ISO860 formatted date string representing the upper bound of a filter window on the investigated_at field. Returns signals where the lower bound of the investigated_at is less than investigated_at_max.'
	},
	{
		displayName: 'Types',
		name: 'types',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['signal'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'Filter by the types of Signal, must be comma-separated string containing the values',
	},
	{
		displayName: 'Statuses',
		name: 'statuses',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['signal'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'Filter by the statuses of Signal, must be comma-separated string containing the values',
	},
	{
		displayName: 'Organization ID',
		name: 'organizationId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['signal'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'Filter by organization ID within Huntress account',
	},
	{
		displayName: 'Extract Signals',
		name: 'extractSignals',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['signal'],
				operation: ['getMany'],
			},
		},
		default: true,
		description: 'Whether to extract the signals from the response',
	},
	{
		displayName: 'Extract Signal',
		name: 'extractSignal',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['signal'],
				operation: ['getSignal'],
			},
		},
		default: true,
		description: 'Whether to extract the signal from the response',
	},
];