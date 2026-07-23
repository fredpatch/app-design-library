# Component Acceptance Criteria

A component may enter the shared library only when:

- it imports no application API module;
- it contains no permission logic;
- it contains no business entity type;
- it contains no business-specific status value;
- it contains no hard-coded application branding;
- router behavior is injected;
- API queries and mutations remain application-side;
- all colors use semantic tokens;
- loading, empty, disabled, and error behavior are defined where relevant;
- keyboard and visible-focus behavior are documented;
- responsive behavior is known;
- Prestix and SICOT usage examples exist.
