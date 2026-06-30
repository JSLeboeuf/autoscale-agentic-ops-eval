import path from "node:path";
import { safeError } from "../lib/redact.js";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set(["image/png", "image/jpeg", "application/pdf"]);
const ALLOWED_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".pdf"]);

export function validateUpload(file) {
  const originalName = String(file?.originalName ?? "");
  const mimeType = String(file?.mimeType ?? "");
  const size = Number(file?.size ?? 0);
  const baseName = path.basename(originalName);
  const extension = path.extname(baseName).toLowerCase();
  const errors = [];

  if (!baseName || baseName !== originalName || baseName.includes("\0")) {
    errors.push("unsafe_filename");
  }

  if (!ALLOWED_EXTENSIONS.has(extension)) {
    errors.push("unsupported_extension");
  }

  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    errors.push("unsupported_mime_type");
  }

  if (!Number.isFinite(size) || size <= 0 || size > MAX_BYTES) {
    errors.push("invalid_size");
  }

  if (errors.length > 0) {
    return {
      ok: false,
      status: 400,
      body: safeError("Invalid upload", {
        errors,
        originalName,
        mimeType,
        size,
      }),
    };
  }

  return {
    ok: true,
    status: 202,
    body: {
      accepted: true,
      safeName: baseName,
      mimeType,
      size,
      stored: false,
      requiresHumanApproval: true,
    },
  };
}
