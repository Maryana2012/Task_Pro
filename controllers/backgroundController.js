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
