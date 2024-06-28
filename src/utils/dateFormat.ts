export function dateFormat(timestamp: string): string {
    const now = new Date();
    const past = new Date(timestamp);
  
    if (isNaN(past.getTime())) {
      throw new Error("Invalid timestamp");
    }
  
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (minutes < 1) {
      return "Just now";
    } else if (minutes < 60) {
      return `${minutes} m`;
    } else if (hours < 24) {
      return `${hours} h`;
    } else {
      return `${days} d`;
    }
  }
  