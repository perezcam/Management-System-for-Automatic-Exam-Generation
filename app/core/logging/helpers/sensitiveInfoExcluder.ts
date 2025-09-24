import { SensitiveKeys } from "../../logging/enums/sensitiveKeys";

const sensitiveKeysList = Object.values(SensitiveKeys) as string[];


const excludeSensitiveInfoInData = (data: any): any => {

  if (typeof data === 'object' && data !== null 
      && !data.constructor.name.startsWith('model')) {
    if (Array.isArray(data)) {
      return data.map(item => excludeSensitiveInfoInData(item));
    }

    const redactedData: any = {};

    for (const key in data) {
      if (sensitiveKeysList.includes(key)) {
        redactedData[key] = '*****'; 
      } else {
        // Recursively redact sensitive keys within nested objects
        redactedData[key] = excludeSensitiveInfoInData(data[key]);
      }
    }

    return redactedData;
  } else {
    return data;
  }
};


export { excludeSensitiveInfoInData };