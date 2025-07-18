import { s } from '@sapphire/shapeshift'

const namePredicate = s
	.string()
	.lengthGreaterThanOrEqual(1)
	.lengthLessThanOrEqual(32)
	.regex(/^[\p{Ll}\p{Lm}\p{Lo}\p{N}\p{sc=Devanagari}\p{sc=Thai}_-]+$/u)

export function validateName(name:unknown): asserts name is string {
    namePredicate.parse(name)
}