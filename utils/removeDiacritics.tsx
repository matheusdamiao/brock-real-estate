export function removeDiacritics(str: string) {
    const withoutDiacritics = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return withoutDiacritics.replace(/\s+/g, '-');
  }