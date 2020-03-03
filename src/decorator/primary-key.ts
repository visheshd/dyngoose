import { ITable } from '../table'

/**
 * Specify your table's primary key attribute names.
 *
 * All tables must specify the primary key of the table.
 * The primary key uniquely identifies each item in the table, so that no two items can have the same key.
 *
 * DynamoDB supports two different kinds of primary keys:
 * - Partition key (aka HASH attribute):
 *   A simple primary key, composed of one attribute known as the partition key. DynamoDB uses the partition key's
 *   value as input to an internal hash function. The output from the hash function determines the partition (physical
 *   storage internal to DynamoDB) in which the item will be stored.
 *
 *   NOTE: In a table that has only a partition key, no two items can have the same partition key value.
 *
 * - Sort key (aka RANGE attribute):
 *   While the output from the hash function (as defined by the primary key) determines the partition
 *   (physical storage internal to DynamoDB) in which the item will be stored, the sort key specifies
 *   the order the items are stored.
 *
 *   All items with the same partition key value are stored together, in sorted order by sort key value.
 *
 *   NOTE: In a table with a partition and a sort key, the combination of the two keys must be unique.
 *
 * The combination of the Partition and Sort ket make up what is called the composite primary key.
 *
 * @see https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html#HowItWorks.CoreComponents.PrimaryKey
 *
 * @param {string} partitionKeyAttributeName The Partition or HASH Key.
 * @param {string} [sortAttributeName] The Sort or RANGE Key.
 */
export function PrimaryKey(partitionKeyAttributeName: string, sortAttributeName?: string) {
  return (tableClass: ITable<any>, propertyName: string) => {
    tableClass.schema.setPrimaryKey(partitionKeyAttributeName, sortAttributeName, propertyName)
  }
}
