const ClassLevel = require("../../models/academic/ClassLevel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const classAuthorize = ["Licence", "Master", "Doctorat"];
exports.createClassLevel = catchAsync(async (req, res, next) => {
  // Create a new class
  const { name, frais } = req.body;
  const classCreated = await ClassLevel.create({ name, frais });
  res.status(201).json({
    status: "success",
    message: "Niveau Crée avec succès",
    classCreated,
  });
});

exports.getClassLevels = catchAsync(async (req, res, next) => {
  const classLevels = await ClassLevel.find().populate("subjects");
  res.status(201).json({
    status: "success",
    data: classLevels,
  });
});

exports.updateClassLevels = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const { id } = req.params;
  // CHECK IF ID EXIST
  if (!name) {
    next(new AppError("Veuillez remplir le champ du nom", 400, "ErrorName"));
  }
  const classLevel = await ClassLevel.findByIdAndUpdate(
    id,
    { name, frais: req.body.frais },
    { new: true }
  );
  res.status(201).json({
    status: "success",
    data: classLevel,
  });
});

exports.getSingleClassLevel = catchAsync(async (req, res, next) => {
  const classLevel = await ClassLevel.findById(req.params.id);
  res.status(201).json({
    status: "success",
    data: classLevel,
  });
});
