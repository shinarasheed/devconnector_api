const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profile.controller');
const ProfileValidator = require('../middlewares/profile.validation');
const ProfileEducationValidator = require('../middlewares/profileEducation.validation');
const ProfileExperienceValidator = require('../middlewares/profileExperience.validation');
const verifyToken = require('../middlewares/auth.middleware');

router.post(
  '/',
  ProfileValidator.validateData(),
  ProfileValidator.ValidationResult,
  verifyToken,
  ProfileController.createProfile
);

router.post(
  '/education',
  ProfileEducationValidator.validateData(),
  ProfileEducationValidator.ValidationResult,
  verifyToken,
  ProfileController.addEducation
);

router.delete(
  '/education/:educationId',
  verifyToken,
  ProfileController.deleteEducation
);

router.post(
  '/experience',
  ProfileExperienceValidator.validateData(),
  ProfileExperienceValidator.ValidationResult,
  verifyToken,
  ProfileController.addExperience
);

router.delete(
  '/experience/:experienceId',
  verifyToken,
  ProfileController.deleteExperience
);

router.delete('/', verifyToken, ProfileController.deleteProfile);

router.get('/', verifyToken, ProfileController.getProfile);

router.get('/github/:username', verifyToken, ProfileController.getGithubrepos);

module.exports = router;
