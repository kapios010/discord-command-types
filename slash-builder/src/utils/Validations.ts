import { BaseValidator, s } from '@sapphire/shapeshift'

const namePredicate = s
	.string()
	.lengthGreaterThanOrEqual(1)
	.lengthLessThanOrEqual(32)
	.regex(/^[-_'\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$/u)

export function validateName(name:unknown): asserts name is string {
    namePredicate.parse(name)
}

const descriptionPredicate = s
	.string()
	.lengthGreaterThanOrEqual(1)
	.lengthLessThanOrEqual(100)

export function validateDescription(description: unknown): asserts description is string {
	descriptionPredicate.parse(description)
}

const choiceNamePredicate = s
	.string()
	.lengthGreaterThanOrEqual(1)
	.lengthLessThanOrEqual(100)

export function validateChoiceName(name: unknown): asserts name is string {
	choiceNamePredicate.parse(name)
}

const stringOptionMinLengthPredicate = s
	.number()
	.int()
	.greaterThanOrEqual(0)
	.lessThanOrEqual(6000)

export function validateStringOptionMinLength(length: unknown): asserts length is number {
	stringOptionMinLengthPredicate.parse(length)
}

const stringOptionMaxLengthPredicate = s
	.number()
	.int()
	.greaterThanOrEqual(0)
	.lessThanOrEqual(6000)

export function validateStringOptionMaxLength(length: unknown): asserts length is number {
	stringOptionMaxLengthPredicate.parse(length)
}

const intPredicate = s
	.number()
	.int()

export function validateInteger(number: unknown): asserts number is number {
	intPredicate.parse(number)
}