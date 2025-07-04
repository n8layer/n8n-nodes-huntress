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
				name: 'Get Account',
				value: 'getAccount',
				action: 'Get account by ID',
				routing: {
					request: {
						method: 'GET',
						url: '/actor',
					},
				},
			},
		],
		default: 'getAccount',
	},
];