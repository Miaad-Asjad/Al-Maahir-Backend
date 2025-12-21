import CalendarEvent from "../models/CalendarEvent.js";

export async function create(req, res) {
  try {
    const event = new CalendarEvent(req.body);
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getAll(req, res) {
  try {
    const list = await CalendarEvent.find().sort({ date: 1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteOne(req, res) {
  try {
    await CalendarEvent.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
