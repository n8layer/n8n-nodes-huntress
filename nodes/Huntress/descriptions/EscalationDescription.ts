import type { INodeProperties } from 'n8n-workflow';

export const escalationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['escalation'],
			},
		},
		options: [
			{
				name: 'Create Escalation Resolution',
				value: 'createEscalationResolution',
				action: 'Create escalation resolution',
				description: 'Create a resolution for an escalation',
				routing: {
					request: {
						method: 'POST',
						url: '=/escalations/{{$parameter["escalationId"]}}/resolutions',
					},
				},
			},
			{
				name: 'Get Escalation',
				value: 'getEscalation',
				action: 'Get escalation',
				routing: {
					request: {
						method: 'GET',
						url: '=/escalations/{{$parameter["escalationId"]}}',
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									extractedEscalation: '={{ $parameter.extractEscalation ? $response.body.escalation : [$response.body] }}',
								},
							},
							{
								type: 'rootProperty',
								properties: {
									property: 'extractedEscalation',
								}
							}
						],
					},
				},
			},
			{
				name: 'List Escalations',
				value: 'listEscalations',
				action: 'List escalations',
				routing: {
					request: {
						method: 'GET',
						url: '=/escalations',
						qs: {
							limit: '={{$parameter.limit}}',
							page: '={{$parameter.page}}',
						},
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									extractedEscalations: '={{ $parameter.extractEscalations ? $response.body.escalations : [$response.body] }}',
								},
							},
							{
								type: 'rootProperty',
								properties: {
									property: 'extractedEscalations',
								}
							}
						],
					},
				},
			},
		],
		default: 'getEscalation',
	},
];

export const escalationFields: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['escalation'],
				operation: ['listEscalations'],
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
				resource: ['escalation'],
				operation: ['listEscalations'],
			},
		},
		default: 1,
		description: 'The window location for the current resource. In conjunction with the limit field, shows results beginning with page * limit up to (page + 1) * limit. Must be an integer greater than 0 or a 400 error will occur.',
	},
	{
		displayName: 'Extract Escalations',
		name: 'extractEscalations',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['escalation'],
				operation: ['listEscalations'],
			},
		},
		description: 'Whether to extract the escalations from the response',
	},
	{
		displayName: 'Extract Escalation',
		name: 'extractEscalation',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['escalation'],
				operation: ['getEscalation'],
			},
		},
		description: 'Whether to extract the escalation from the response',
	},
	{
		displayName: 'Escalation ID',
		name: 'escalationId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['escalation'],
				operation: ['getEscalation', 'createEscalationResolution'],
			},
		},
		default: '',
		description: 'The ID of the escalation',
	},
];
