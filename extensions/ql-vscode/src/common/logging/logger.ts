export interface LogOptions {
  // If false, don't output a trailing newline for the log entry. Default true.
  trailingNewline?: boolean;
}

export interface Logger {
  /**
   * Writes the given log message, optionally followed by a newline.
   * This function is asynchronous and will only resolve once the message is written
   * to the side log (if required). It is not necessary to await the results of this
   * function if you don't need to guarantee that the log writing is complete before
   * continuing.
   *
   * @param message The message to log.
   * @param options Optional settings.
   */
  log(message: string, options?: LogOptions): Promise<void>;

  /**
   * Reveal the logger channel in the UI.
   *
   * @param preserveFocus When `true` the channel will not take focus.
   */
  show(preserveFocus?: boolean): void;
}
