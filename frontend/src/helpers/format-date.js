export function formatDate(date, formatOptions = { year: "numeric", month: "2-digit", day: "2-digit" }) {

    let result = "-";
  
    try {
  
      if (date instanceof Date) {
  
        result = new Intl.DateTimeFormat('hu-HU', formatOptions).format(date);
  
      } else {
  
        switch (typeof date) {
  
          case 'string':
            date.trim();
  
            if (date.length > 0) {
  
              let parsedDate = parseInt(date);
  
              if (!isNaN(parsedDate)) {
                result = new Intl.DateTimeFormat('hu-HU', formatOptions).format(new Date(parsedDate));
              }
            }
            break;
  
          case 'number':
            if (!isNaN(date)) {
              result = new Intl.DateTimeFormat('hu-HU', formatOptions).format(new Date(date));
            }
  
        }
  
      }
  
      return result;
  
    } catch {
      return result;
    }
  
  }