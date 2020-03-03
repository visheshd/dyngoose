import { SchemaError } from '../errors'
import { ITable } from '../table'

/**
 * Specify a SecondaryLocalIndex for the table.
 *
 * @see {@link https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html
 *    #HowItWorks.CoreComponents.SecondaryIndexes}
 *
 * @param {stirng} sortAttributeName The sort key attribute name.
 * @param {string} [options.name] The name of the index.
 */
export function LocalSecondaryIndex(sortAttributeName: string, options: { name?: string; } = {}) {
  return (tableClass: ITable<any>, propertyName: string) => {
    const indexName = options.name || propertyName
    const range = tableClass.schema.getAttributeByName(sortAttributeName)
    if (!range) {
      throw new SchemaError(`Specified sort attribute ${sortAttributeName} for local secondary index ${indexName} is an unknown attribute`)
    }

    tableClass.schema.localSecondaryIndexes.push({
      name: indexName,
      propertyName,
      range,
    })
  }
}
