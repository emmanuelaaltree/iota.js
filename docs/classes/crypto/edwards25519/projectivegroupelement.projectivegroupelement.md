[@iota/iota.js](../../../README.md) / [crypto/edwards25519/projectiveGroupElement](../../../modules/crypto_edwards25519_projectivegroupelement.md) / ProjectiveGroupElement

# Class: ProjectiveGroupElement

[crypto/edwards25519/projectiveGroupElement](../../../modules/crypto_edwards25519_projectivegroupelement.md).ProjectiveGroupElement

Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
y^2 where d = -121665/121666.
ProjectiveGroupElement: (X:Y:Z) satisfying x=X/Z, y=Y/Z

## Hierarchy

* **ProjectiveGroupElement**

## Table of contents

### Constructors

- [constructor](projectivegroupelement.projectivegroupelement.md#constructor)

### Properties

- [X](projectivegroupelement.projectivegroupelement.md#x)
- [Y](projectivegroupelement.projectivegroupelement.md#y)
- [Z](projectivegroupelement.projectivegroupelement.md#z)

### Methods

- [doubleScalarMultVartime](projectivegroupelement.projectivegroupelement.md#doublescalarmultvartime)

## Constructors

### constructor

\+ **new ProjectiveGroupElement**(`X?`: [*FieldElement*](fieldelement.fieldelement.md), `Y?`: [*FieldElement*](fieldelement.fieldelement.md), `Z?`: [*FieldElement*](fieldelement.fieldelement.md)): [*ProjectiveGroupElement*](projectivegroupelement.projectivegroupelement.md)

Create a new instance of CompletedGroupElement.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`X?` | [*FieldElement*](fieldelement.fieldelement.md) | The X element.   |
`Y?` | [*FieldElement*](fieldelement.fieldelement.md) | The Y Element.   |
`Z?` | [*FieldElement*](fieldelement.fieldelement.md) | The Z Element.    |

**Returns:** [*ProjectiveGroupElement*](projectivegroupelement.projectivegroupelement.md)

## Properties

### X

• **X**: [*FieldElement*](fieldelement.fieldelement.md)

The X element.

___

### Y

• **Y**: [*FieldElement*](fieldelement.fieldelement.md)

The Y Element.

___

### Z

• **Z**: [*FieldElement*](fieldelement.fieldelement.md)

The Z Element.

## Methods

### doubleScalarMultVartime

▸ **doubleScalarMultVartime**(`a`: *Uint8Array*, `A`: [*ExtendedGroupElement*](extendedgroupelement.extendedgroupelement.md), `b`: *Uint8Array*): *void*

GeDoubleScalarMultVartime sets r = a*A + b*B
where a = a[0]+256*a[1]+...+256^31 a[31].
and b = b[0]+256*b[1]+...+256^31 b[31].
B is the Ed25519 base point (x,4/5) with x positive.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`a` | *Uint8Array* | The a   |
`A` | [*ExtendedGroupElement*](extendedgroupelement.extendedgroupelement.md) | The A   |
`b` | *Uint8Array* | The b    |

**Returns:** *void*