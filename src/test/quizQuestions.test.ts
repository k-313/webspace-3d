import { describe, it, expect } from 'vitest';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';

describe('Astronomy Quiz Dataset Integrity', () => {
  it('contains at least 10 educational questions', () => {
    expect(QUIZ_QUESTIONS.length).toBeGreaterThanOrEqual(10);
  });

  it('ensures each question has 4 unique options and valid correct index', () => {
    for (const q of QUIZ_QUESTIONS) {
      expect(q.options.length).toBe(4);
      expect(new Set(q.options).size).toBe(4); // No duplicate answers
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
      expect(q.explanation.length).toBeGreaterThan(20);
      expect(q.source.length).toBeGreaterThan(5);
    }
  });

  it('covers multiple categories and difficulty tiers', () => {
    const difficulties = new Set(QUIZ_QUESTIONS.map((q) => q.difficulty));
    expect(difficulties).toContain('beginner');
    expect(difficulties).toContain('intermediate');
    expect(difficulties).toContain('advanced');

    const categories = new Set(QUIZ_QUESTIONS.map((q) => q.category));
    expect(categories.size).toBeGreaterThanOrEqual(3);
  });
});
