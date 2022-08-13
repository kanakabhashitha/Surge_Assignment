import Notes from "../models/Notes.js";
import {
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError,
} from "../errors/index.js";

const getAllNotes = async (req, res, next) => {
  const { sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.title = { $regex: search, $options: "i" };
  }

  // NO AWAIT

  let result = Notes.find(queryObject);

  // chain sort conditions

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("subject");
  }
  if (sort === "z-a") {
    result = result.sort("-subject");
  }

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const notes = await result;

  const totalNote = await Notes.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalNote / limit);

  res.status(200).json({ notes, totalNote, numOfPages });
};

const addNotes = async (req, res, next) => {
  try {
    const { subject, title, description, deadline } = req.body;

    if (!subject || !title || !description || !deadline) {
      const err = new BadRequestError("Please provide all values");
      next(err);
    }

    const note = new Notes({
      subject,
      title,
      description,
      deadline,
      createdBy: req.user.userId,
    });

    const notes = await note.save();

    res.status(201).json({ notes });
  } catch (error) {
    next(error);
  }
};

const updateNotes = async (req, res, next) => {
  try {
    const { id: noteId } = req.params;
    const { subject, title, description, deadline } = req.body;

    if (!subject || !title || !description || !deadline) {
      const err = new BadRequestError("Please provide all values");
      next(err);
    }
    const note = await Notes.findOne({ _id: noteId });
    if (!note) {
      const err = new NotFoundError(`No notes with id :${noteId}`);
      next(err);
    }
    const updateNote = await Notes.findOneAndUpdate({ _id: noteId }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ updateNote });
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const { id: noteId } = req.params;
    const note = await Notes.findOne({ _id: noteId });

    if (!note) {
      const err = new NotFoundError(`No notes with id :${noteId}`);
      next(err);
    }

    await note.remove();
    res.status(200).json({ msg: "Success! your note removed" });
  } catch (error) {
    next(error);
  }
};

export { addNotes, updateNotes, deleteNote, getAllNotes };
