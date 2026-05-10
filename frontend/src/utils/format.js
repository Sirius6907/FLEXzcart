export function formatPrice(cents, currency) {
  return new Intl.NumberFormat('en-IN', {
    style: "currency",
    currency: (currency ?? "inr").toUpperCase(),
  }).format(cents / 100);
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(new Date(date));
}

export function formatOrderWhen(iso, opts = {}) {
  const { dateStyle = "medium" } = opts;
  if (!iso) return "";

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(undefined, {
    dateStyle,
    timeStyle: "short",
  }).format(date);
}
