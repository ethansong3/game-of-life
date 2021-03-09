let status = "You've played many games recently.\nWhy not take a break?"; // Default message

// Updates the recommendation
export function updateRecommendation(new_status)
{
  status = new_status;
}

// Returns the current recommendation
export function getRecommendation()
{
  return status;
}
