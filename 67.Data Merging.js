
export default function mergeData(sessions) {
  const users = new Map();

  for (const session of sessions) {
    const { user, duration, equipment } = session;

    if (!users.has(user)) {
      users.set(user, {
        user,
        duration: 0,
        equipment: new Set(),
      });
    }

    const current = users.get(user);

    current.duration += duration;

    for (const item of equipment) {
      current.equipment.add(item);
    }
  }

  return Array.from(users.values(), (user) => ({
    ...user,
    equipment: [...user.equipment].sort(),
  }));
}
