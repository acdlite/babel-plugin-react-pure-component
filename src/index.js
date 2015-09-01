/**
 * Set the displayName of components created with react-pure-component
 */
export default function ({ Plugin, types: t }) {
  return new Plugin('react-pure-component', {
    visitor: {
      VariableDeclarator(node) {
        if (
          node.init &&
          node.init.type === 'CallExpression' &&
          node.init.callee.type === 'Identifier' &&
          node.init.callee.name === 'pure'
        ) {
          const displayName = node.id.name;
          return [
            node,
            t.expressionStatement(
              t.assignmentExpression(
                '=',
                t.memberExpression(
                  t.identifier(displayName),
                  t.identifier('displayName')
                ),
                t.literal(displayName)
              )
            )
          ];
        }

        return node;
      }
    }
  });
}
