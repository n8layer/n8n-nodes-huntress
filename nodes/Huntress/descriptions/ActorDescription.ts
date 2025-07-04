import type { INodeProperties } from 'n8n-workflow';

export const actorOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'actor',
				],
			},
		},
		options: [
			{
				name: 'Get Actor',
				value: 'getActor',
				action: 'Get actor',
				routing: {
					request: {
						method: 'GET',
						url: '/actor',
					},
				},
			},
		],
		default: 'getActor',
	},
];