import { GraphQLResolveInfo, FieldNode, Kind } from 'graphql';

type SelectedFields = {
  [key: string]: true | SelectedFields;
};

function getSelectedFields(info: GraphQLResolveInfo): SelectedFields {
  const fields: SelectedFields = {};

  for (const fieldNode of info.fieldNodes) {
    Object.assign(fields, collectFields(fieldNode));
  }

  return fields;
}

function collectFields(node: FieldNode): SelectedFields {
  const result: SelectedFields = {};

  const selections = node.selectionSet?.selections ?? [];

  for (const selection of selections) {
    if (selection.kind === Kind.FIELD) {
      const fieldName = selection.name.value;

      if (selection.selectionSet) {
        // result[fieldName] = collectFields(selection);
        result[fieldName] = {
          select: collectFields(selection),
        };
      } else {
        result[fieldName] = true;
      }
    }
  }

  return result;
}

export { getSelectedFields, SelectedFields };
