import { Request, Response, NextFunction } from "express";
import { validationResult, body, param } from "express-validator";

export const validateEventId = [
  param("id").isInt().withMessage("ID must be an integer"),
];

export const validateCreateEvent = [
  body("event_name").isString().notEmpty().withMessage("Name is required"),
  body("odds").isNumeric().withMessage("Odds must be a number"),
];

export const validateUpdateEvent = [
  param("id").isInt().withMessage("ID must be an integer"),
  body("event_name").optional().isString().withMessage("Name must be a string"),
  body("odds").optional().isNumeric().withMessage("Odds must be a number"),
];

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};
