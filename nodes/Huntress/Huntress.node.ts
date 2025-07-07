import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

import { organizationOperations, organizationFields } from './descriptions/OrganizationDescription';
import { accountOperations, accountFields } from './descriptions/AccountDescription';
import { actorOperations } from './descriptions/ActorDescription';
import { agentOperations, agentFields } from './descriptions/AgentDescription';
import { billingReportOperations, billingReportFields } from './descriptions/BillingReportDescription';
import { incidentReportOperations, incidentReportFields } from './descriptions/IncidentReport';
import { reportOperations, reportFields } from './descriptions/ReportDescription';
import { signalOperations, signalFields } from './descriptions/SignalDescription';

export class Huntress implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Huntress',
		name: 'huntress',
		icon: 'file:Huntress.svg',
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
				name: 'huntressBasicApi',
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
						name: 'Account',
						value: 'account',
					},
					{
						name: 'Actor',
						value: 'actor',
					},
					{
						name: 'Agent',
						value: 'agent',
					},
					{
						name: 'Billing Report',
						value: 'billingReport',
					},
					{
						name: 'Incident Report',
						value: 'incidentReport',
					},
					{
						name: 'Organization',
						value: 'organization',
					},
					{
						name: 'Report',
						value: 'report',
					},
					{
						name: 'Signal',
						value: 'signal',
					},
				],
				default: 'organization',
			},
			// Operation
			...organizationOperations,
			...organizationFields,
			...accountOperations,
			...accountFields,
			...actorOperations,
			...agentOperations,
			...agentFields,
			...billingReportOperations,
			...billingReportFields,
			...incidentReportOperations,
			...incidentReportFields,
			...reportOperations,
			...reportFields,
			...signalOperations,
			...signalFields,
		],
	};
}
