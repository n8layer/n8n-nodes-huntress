import type { INodeProperties } from 'n8n-workflow';

export const accountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'account',
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
						url: '/account',
					},
				},
			},
		],
		default: 'getAccount',
	},
];