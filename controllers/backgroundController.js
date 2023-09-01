import backgrounds from '../backgrounds/сollectionBackgrounds.js'

const getBackgroundPreviews = (req, res) => {
  try {
    const previewData = backgrounds.map((background) => ({
      _id: background._id,
      previewURL: background.previewURL,
    }));

    if (previewData.length === 0) {
      return res.status(404).json({ error: 'Backgrounds not found' });
    }

    res.status(200).json(previewData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getBackgroundPreviews;

// const getBackgroundPreviews = (req, res) => {
//   try {
//     // Отримуємо значення параметра "fields" з запиту
//     const { fields } = req.query;

//     // Перевіряємо, чи вказаний параметр "fields" і чи містить він "_id" та "previewURL"
//     if (!fields || !fields.includes("_id") || !fields.includes("previewURL")) {
//       return res.status(400).json({ error: 'Invalid fields parameter' });
//     }

//     const previewData = backgrounds.map((background) => ({
//       _id: background._id,
//       previewURL: background.previewURL,
//     }));

//     if (previewData.length === 0) {
//       return res.status(404).json({ error: 'Backgrounds not found' });
//     }

//     res.status(200).json(previewData);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export default getBackgroundPreviews;
