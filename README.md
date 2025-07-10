# n8n-nodes-huntress

This is an n8n community node. It lets you use Huntress in your n8n workflows.

Huntress is a cybersecurity platform that provides managed security services, threat detection, and incident response capabilities. This node allows you to integrate with the Huntress API to access organization data, agent information, incident reports, and more.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node supports the following resources and operations:

### Account
- **Get Account**: Retrieve account information

### Actor
- **Get Actor**: Retrieve actor information

### Agent
- **Get Agent**: Retrieve a specific agent by ID
- **Get Agents**: Retrieve multiple agents with filtering options (by organization, platform, date ranges)

### Billing Report
- **Get Billing Report**: Retrieve a specific billing report by ID
- **Get Billing Reports**: Retrieve multiple billing reports with filtering options

### Incident Report
- **Get Incident Report**: Retrieve a specific incident report by ID
- **Get Incident Reports**: Retrieve multiple incident reports with filtering options (by status, severity, platform, organization, agent, indicator type, date ranges)

### Organization
- **Get Organization**: Retrieve a specific organization by ID
- **Get Organizations**: Retrieve multiple organizations with filtering options (by date ranges)

### Report
- **Get Report**: Retrieve a specific report by ID
- **Get Reports**: Retrieve multiple reports with filtering options

### Signal
- **Get Signal**: Retrieve a specific signal by ID
- **Get Signals**: Retrieve multiple signals with filtering options

All "Get Many" operations support pagination and various filtering options including date ranges, organization filtering, and platform-specific filtering.

## Credentials

To use this node, you need to authenticate with the Huntress API using Basic Authentication:

### Prerequisites
- A Huntress account with API access
- API credentials (username and password) from your Huntress account

### Authentication Setup
1. In n8n, create new credentials of type "Huntress Basic API"
2. Enter your Huntress API username in the "User" field
3. Enter your Huntress API password in the "Password" field

The node will authenticate with the Huntress API at `https://api.huntress.io/v1` using these credentials.

## Compatibility

This node is compatible with:
- **Minimum n8n version**: Uses n8n-workflow API version 1
- **Node.js version**: Requires Node.js 20.15 or higher
- **Tested with**: n8n community node standards

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Huntress API documentation](https://api.huntress.io/docs#introduction)
* [Huntress official website](https://www.huntress.com/)


