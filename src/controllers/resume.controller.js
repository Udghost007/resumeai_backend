import Resume from "../models/Resume.js";

export const listResumes = async (req, res) => {
  const filter = { userId: req.user._id };

  if (req.query.template && req.query.template !== "all" && req.query.template !== "All Templates") {
    filter.template = req.query.template.toLowerCase();
  }

  if (req.query.search) {
    filter.title = { $regex: req.query.search, $options: "i" };
  }

  const resumes = await Resume.find(filter).sort({ updatedAt: -1 });
  res.json({ success: true, resumes });
};

export const createResume = async (req, res) => {
  const resume = await Resume.create({ ...req.body, userId: req.user._id });
  res.status(201).json({ success: true, resume });
};

export const getResume = async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
  if (!resume) return res.status(404).json({ success: false, message: "Resume not found" });
  res.json({ success: true, resume });
};

export const updateResume = async (req, res) => {
  const resume = await Resume.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true, runValidators: true },
  );
  if (!resume) return res.status(404).json({ success: false, message: "Resume not found" });
  res.json({ success: true, resume });
};

export const deleteResume = async (req, res) => {
  const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!resume) return res.status(404).json({ success: false, message: "Resume not found" });
  res.json({ success: true, message: "Resume deleted" });
};
