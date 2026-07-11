type ProgramTextFields = Record<string, unknown>;

function optionalText(value: unknown) {
  if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") {
    return undefined;
  }

  const text = String(value).trim();
  return text ? text : undefined;
}

export function resolveProgramPageEyebrow(fields: ProgramTextFields) {
  return optionalText(
    fields.pageEyebrow ??
      fields.heroEyebrow ??
      fields.pageLabel ??
      fields.eyebrow ??
      fields.label,
  );
}

export function resolveProgramPageHeading(fields: ProgramTextFields) {
  return optionalText(
    fields.pageHeading ??
      fields.heading ??
      fields.pageDescription ??
      fields.intro ??
      fields.description,
  );
}

export function resolveProgramViewAllLabel(fields: ProgramTextFields) {
  return optionalText(fields.viewAllLabel);
}

export function resolveProgramPrimaryFilterLabel(fields: ProgramTextFields) {
  return optionalText(fields.primaryFilterLabel);
}

export function resolveProgramSecondaryFilterLabel(fields: ProgramTextFields) {
  return optionalText(fields.secondaryFilterLabel);
}
