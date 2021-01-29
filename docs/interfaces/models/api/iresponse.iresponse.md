[@iota/iota.js](../../../README.md) / [models/api/IResponse](../../../modules/models_api_iresponse.md) / IResponse

# Interface: IResponse<T\>

[models/api/IResponse](../../../modules/models_api_iresponse.md).IResponse

Base response data.

## Type parameters

Name |
------ |
`T` |

## Hierarchy

* **IResponse**

## Table of contents

### Properties

- [data](iresponse.iresponse.md#data)
- [error](iresponse.iresponse.md#error)

## Properties

### data

• **data**: T

The data in the response.

___

### error

• **error**: { `code`: *string* ; `message`: *string*  }

Optional error in the response.

#### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`code` | *string* | The code for the error response.   |
`message` | *string* | A more descriptive version of the error.   |