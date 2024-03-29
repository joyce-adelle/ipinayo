import { ScoreType } from "../../utilities/ScoreType";

export interface CreateMusic {
  score: string;
  title: string;
  description: string;
  scoreType: ScoreType;
  languages: string[];
  relatedPhrasesIds: string[];
  categoryIds: string[];
  uploadedById: string;
  audio?: string,
  composers?: string;
  yearOfComposition?: string;
  arrangers?: string;
  yearOfArrangement?: string;
}
