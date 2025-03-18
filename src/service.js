import axios from 'axios';
axios.defaults.baseURL="http://localhost:5034"

// הוספת interceptor לשגיאות
axios.interceptors.response.use(
  response => {
    // אם התגובה היא חיובית, מחזירים את התגובה
    return response;
  },
  error => {
    // במקרה של שגיאה, רושמים ללוג
    console.error('שגיאה ב-response:', error.response ? error.response.data : error.message);
    return Promise.reject(error); // מחזירים את השגיאה להמשך טיפול
  }
);

export default {
  getTasks: async () => {
    try {
      const response = await axios.get('/Item');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  addTask: async (name) => {
    try {
      const response = await axios.post('/Item', { name });
      return response.data; // החזרת הנתונים שנוצרו
    } catch (error) {
      console.error('Error adding task:', error);
      throw error; // או טיפול בשגיאות נוסף
    }
  },

  setCompleted: async (id, isComplete) => {
    try {
      const response = await axios.put(`/Item/${id}`, { isComplete });
      return response.data; // החזרת הנתונים המעודכנים
    } catch (error) {
      console.error('Error updating task completion:', error);
      throw error; // או טיפול בשגיאות נוסף
    }
  },

  deleteTask: async (id) => {
    try {
      await axios.delete(`/Item/${id}`);
      return { success: true }; // החזרת תוצאה מוצלחת
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error; // או טיפול בשגיאות נוסף
    }
  }
};

