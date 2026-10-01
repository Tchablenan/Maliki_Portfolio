import type { ReactNode } from 'react';

import { Toolbar, ToolbarActions, ToolbarDescription, ToolbarHeading, ToolbarPageTitle } from './layout/toolbar';

/** Title + description + optional actions at the top of every back-office page. */
export function PageHeader({ title, description, actions }: { title?: string; description?: ReactNode; actions?: ReactNode }) {
  return (
    <Toolbar>
      <ToolbarHeading>
        <ToolbarPageTitle>{title}</ToolbarPageTitle>
        {description && <ToolbarDescription>{description}</ToolbarDescription>}
      </ToolbarHeading>
      {actions && <ToolbarActions>{actions}</ToolbarActions>}
    </Toolbar>
  );
}
