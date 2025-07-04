import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

import { customerOperations } from './descriptions/CustomerDescription';

export class Huntress implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Huntress',
		name: 'huntress',
		icon: 'file:Huntress.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Huntress API',
		defaults: {
			name: 'Huntress',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'huntressApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.huntress.io/v1',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Customer',
						value: 'customer',
					},
					{
						name: 'Customer Catalog',
						value: 'customerCatalog',
					},
					{
						name: 'Customer Platform',
						value: 'customerPlatform',
					},
					{
						name: 'Order',
						value: 'orders',
					},
					{
						name: 'Payable Charge',
						value: 'payableCharge',
					},
					{
						name: 'Platform',
						value: 'platform',
					},
					{
						name: 'Receivable Charge',
						value: 'receivableCharge',
					},
					{
						name: 'Subscription',
						value: 'subscription',
					},
					{
						name: 'Tracking',
						value: 'tracking',
					},
				],
				default: 'customer',
			},
			// Operation
			...customerOperations,
		],
	};
}
